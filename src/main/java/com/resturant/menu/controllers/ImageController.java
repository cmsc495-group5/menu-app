package com.resturant.menu.controllers;

import com.resturant.menu.models.Image;
import com.resturant.menu.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImageController {
    ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @RequestMapping(method= RequestMethod.GET, value="/image")
    public Iterable<Image> getAllImages() {
        return imageService.getImages();
    }
}
