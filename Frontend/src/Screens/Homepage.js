import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import "./HomePage.css";
import {
    Box,
    Button,
    Input,
    Container,
    VStack,
    HStack,
} from "@chakra-ui/react";

export default function Homepage() {
    
    return (
        <Box bg={"blackAlpha.800"}>
        <div >

            <div
                id="carouselExampleFade"
                className="searchdiv"
                data-bs-ride="carousel"
            >
                
            </div>
        </div>
        </Box>
    );
}
