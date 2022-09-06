import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {baseUrl} from "../config";
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container, ThemeProvider,
    Typography
} from "@mui/material";
import theme from "../customTheme";


const Results = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [category, setCategory] = useState();
    const [weathers, setWeathers] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const addWeather = (restaurantTitle, weather) => {
        setWeathers([...weathers, { restaurantTitle, weather }]);
    };

    const addToFavorite = async (category) => {
        try {
            const url = `${baseUrl}/favorites`;
            const response = await fetch(url, {
                headers: {
                    "x-access-token": sessionStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({ categoryName: category })
            });
            const responseJson = await response.json();
            if (response.status >= 400) {
                throw new Error(responseJson.error);
            }
            setFavorites([...favorites, category]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const geoCodeLocation = async (location) => {
        const uriEncodedLocation = encodeURI(location);
        const url = `https://nominatim.openstreetmap.org/search?q=${uriEncodedLocation}&format=json`;
        const response = await fetch(url);
        const responseJson = await response.json();
        const firstResponse = responseJson[0];
        return {
            lat: firstResponse.lat,
            lon: firstResponse.lon,
        };
    };

    const getWeatherForGeoLocation = async (lat, lon) => {
        const date = new Date();
        const dateString = date.toISOString().substring(0, 10);
        const url = `https://api.brightsky.dev/weather?lat=${lat}&lon=${lon}&date=${dateString}`;
        const response = await fetch(url);
        const responseJson = await response.json();
        return responseJson.weather.filter(w => w.timestamp.substring(0, 13) === date.toISOString().substring(0, 13))[0];
    };

    const fetchWeatherForLocation = async (restaurantTitle, location) => {
        const coordinates = await geoCodeLocation(location);
        const weather = await getWeatherForGeoLocation(coordinates.lat, coordinates.lon);
        addWeather(restaurantTitle, weather);
    };

    const fetchCategory = async () => {
        setLoading(true);
        try {
            const url = `${baseUrl}/get-category?points=${queryParams.get('points')}`;
            const response = await fetch(url);
            const responseJson = await response.json();
            if (response.status >= 400) {
                throw new Error(responseJson.error);
            }
            setCategory(responseJson);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    };

    const restaurantHasWeather = (restaurantTitle) => {
        return weathers.filter(w => w.restaurantTitle === restaurantTitle).length > 0;
    };

    const getWeatherForRestaurant = (restaurantTitle) => {
        return weathers.filter(w => w.restaurantTitle === restaurantTitle)[0];
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    if (loading) {
        return <CircularProgress />;
    } else if (error) {
        return <Alert severity="error">{error}</Alert>;
    } else if (!category || !category.restaurants || !category.restaurants.length || category.restaurants.length === 0) {
        return <Alert severity="info">No restaurants found for category</Alert>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography className="result">
                    <div className="textAroundCategory"><b>You should go for...</b></div>
                    <div className="categoryName"> {category.categoryName} Food </div>
                    {sessionStorage.getItem("token") && !favorites.includes(category.categoryName) &&
                        <Button onClick={() => addToFavorite(category.categoryName)} size="small">Add "{category.categoryName}" to your favorites</Button>}
                    <div className="textAroundCategory">Here are our favorite restaurants to eat {category.categoryName} food in Vienna: </div>
                </Typography>
                <Container sx={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
                    {category.restaurants.map(restaurant => (
                        <Card sx={{maxWidth: 345, margin: 1}} >
                            <CardMedia
                                component="img"
                                height="140"
                                image={restaurant.imageURL}
                                alt="Picture of restaurant"
                            />
                            <CardContent>
                                <Typography>
                                    <div className="restaurantTitle"> {restaurant.title} </div>
                                    <div className="restaurantDescription"> {restaurant.description} </div>
                                    <div className="restaurantLocation"> Address: {restaurant.location}.</div>
                                </Typography>
                            </CardContent>
                            <CardActions sx={{align: "center"}}>
                                {!restaurantHasWeather(restaurant.title) && <Button
                                    onClick={() => fetchWeatherForLocation(restaurant.title, restaurant.location)}
                                    size="small">Get Weather</Button>}
                                {restaurantHasWeather(restaurant.title) && <Typography variant="restaurantDescription">The temperature
                                    is: {getWeatherForRestaurant(restaurant.title).weather.temperature} °C</Typography>}
                            </CardActions>
                        </Card>
                    ))}
                </Container>
                <Container>
                    <Card sx={{
                        padding: 2,
                        marginTop: 5,
                        marginBottom: 10,
                        borderRadius: 5,
                    }}>
                        <Typography>
                            By the way... You can check the weather at the restaurants right now by clicking on "get
                            weather" under every restaurant.
                            You can also add <b>{category.categoryName}</b> to your favorite categories if you're signed in!
                            So sign up to save your favorite categories!
                        </Typography>
                    </Card>

                </Container>

            </Container>
        </ThemeProvider>
    );
};

export default Results;