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
    Container,
    Typography
} from "@mui/material";

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
        <Container>
            <Typography variant="h4">
                {category.categoryName}
                {sessionStorage.getItem("token") && !favorites.includes(category.categoryName) && <Button onClick={() => addToFavorite(category.categoryName)} size="small">Add to favorites</Button>}
            </Typography>
            <Container sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                {category.restaurants.map(restaurant => (
                    <Card sx={{ maxWidth: 345, margin: 1 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={restaurant.imageURL}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {restaurant.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {restaurant.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {restaurant.location}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {!restaurantHasWeather(restaurant.title) && <Button onClick={() => fetchWeatherForLocation(restaurant.title, restaurant.location)} size="small">Get Weather</Button>}
                            {restaurantHasWeather(restaurant.title) && <Typography variant="body2">Temperature: {getWeatherForRestaurant(restaurant.title).weather.temperature}</Typography>}
                        </CardActions>
                    </Card>
                ))}
            </Container>
        </Container>
    );
};

export default Results;