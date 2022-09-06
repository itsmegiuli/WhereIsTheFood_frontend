import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {baseUrl} from "../config";
import {
    Alert,
    Box,
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
    const [categories, setCategories] = useState([]);
    const [weathers, setWeathers] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/");
        } else {
            fetchFavorites();
        }
    }, []);

    const addWeather = (restaurantTitle, weather) => {
        setWeathers([...weathers, {restaurantTitle, weather}]);
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

    const removeFromFavorites = async (categoryName) => {
        try {
            const url = `${baseUrl}/favorites/${categoryName}`;
            const response = await fetch(url, {
                headers: {
                    "x-access-token": sessionStorage.getItem("token"),
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
            });
            const responseJson = await response.json();
            if (response.status >= 400) {
                throw new Error(responseJson.error);
            }
            await fetchFavorites();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const url = `${baseUrl}/favorites`;
            const response = await fetch(url, {
                headers: {
                    "x-access-token": sessionStorage.getItem("token"),
                }
            });
            const responseJson = await response.json();
            if (response.status >= 400) {
                throw new Error(responseJson.error);
            }
            setCategories(responseJson);
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

    if (loading) {
        return <CircularProgress/>;
    } else if (error) {
        return <Alert severity="error">{error}</Alert>;
    } else if (!categories || !categories.length || categories.length === 0) {
        return <Alert severity="info">No favorite categories found</Alert>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Container sx={{display: "flex", justifyContent: "space-evenly", flexWrap: "wrap"}}>
                <Typography className="result">
                    <div className="textAroundCategory">Here are the restaurants from your favorite categories!</div>
                </Typography>
                <Container sx={{display: "flex", justifyContent: "space-evenly"}}>
                {categories.map(category => (
                    <Box sx={{paddingTop: 2,}}>
                        <Typography className="categoryName">
                            <b>{category.categoryName}</b>
                            <Button
                                onClick={() => removeFromFavorites(category.categoryName)}
                                size="small">[Remove from favorites]</Button>
                        </Typography>
                        {category.restaurants.map(restaurant => (
                            <Card sx={{maxWidth: 345, margin: 1}}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={restaurant.imageURL}
                                    alt="picture of restaurant"
                                />
                                <CardContent>
                                    <Typography>
                                        <div className="restaurantTitle"> {restaurant.title} </div>
                                        <div className="restaurantDescription"> {restaurant.description} </div>
                                        <div className="restaurantLocation"> Address: {restaurant.location}.</div>
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {!restaurantHasWeather(restaurant.title) && <Button
                                        onClick={() => fetchWeatherForLocation(restaurant.title, restaurant.location)}
                                        size="small">Get Weather</Button>}
                                    {restaurantHasWeather(restaurant.title) && <Typography
                                        variant="body2">Temperature: {getWeatherForRestaurant(restaurant.title).weather.temperature} °C</Typography>}
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                ))}
                </Container>
            </Container>
        </ThemeProvider>
    );
};

export default Results;