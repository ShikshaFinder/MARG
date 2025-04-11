"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import {
    Box,
    Text,
    Heading,
    Spinner,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react"
import Video from "../../components/videoshowing";

const LocationDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const response = await fetch("https://h1tq0rjs-8000.inc1.devtunnels.ms/stream", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ location: id }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch: ${response.status} - ${errorText}`);
                }

                let result = await response.json();
                if (typeof result === "string") {
                    result = JSON.parse(result);
                }

                setData(result);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <Box bg="black" minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
            <Box
                bg="gray.900"
                rounded="2xl"
                shadow="2xl"
                p={10}
                w="full"
                maxW="lg"
                textAlign="center"
                color="white"
            >
                <Heading size="lg" mb={4} color="green.400">
                    🚦 AI Traffic Prediction
                </Heading>

                <Text mb={6} color="gray.400">
                    📍{" "}
                    <Text as="span" fontWeight="medium" color="white">
                        Location ID:
                    </Text>{" "}
                    {id || 'Loading...'}
                </Text>

                {loading && <Spinner color="green.400" size="lg" thickness="4px" />}
                {error && <Text color="red.500" fontWeight="semibold">{error}</Text>}

                {data ? (
                    <Box mt={4} textAlign="left" bg="gray.800" p={6} rounded="xl" shadow="inner">
                        <Text fontSize="lg" fontWeight="semibold" mb={3} color="green.300">
                            Predicted Traffic Data:
                        </Text>
                        <Text mb={2}>
                            <Text as="span" fontWeight="semibold" color="white">🚥 Lane:</Text>{" "}
                            {data?.Lane ?? "N/A"}
                        </Text>
                        <Text>
                            <Text as="span" fontWeight="semibold" color="white">⏳ Estimated Wait Time:</Text>{" "}
                            <strong>{data?.Wait_time ?? "N/A"} sec</strong>
                        </Text>
                    </Box>
                ) : (
                    !loading && <Text color="gray.500">No prediction data available.</Text>
                )}
            </Box>

            {/* Video component */}
            <Box w="full" maxW="1200px" mt={4}>
                <Heading size="md" mb={4} color="green.400" textAlign="center">
                    Live Traffic Cameras
                </Heading>
                <Video />
            </Box>
        </Box>
    );
};

export default LocationDetails;
