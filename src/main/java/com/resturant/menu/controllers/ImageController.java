/*
 * file Name: ImageController.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Controller for Image related functions
 */

package com.resturant.menu.controllers;

import com.resturant.menu.models.Image;
import com.resturant.menu.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class ImageController {
    ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/images")
    public Iterable<Image> getImages() {
        return imageService.getImages();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/images")
    public Image saveImage(@RequestBody Image image) {
        imageService.saveImage(image);
        return image;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/images/{id}")
    public Optional<Image> getImage(@PathVariable String id) {
        return imageService.getImageById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/images/{id}")
    public Image updateImage(@PathVariable String id, @RequestBody Image image) {
        return imageService.updateImage(id, image);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/images/{id}")
    public String deleteImage(@PathVariable String id) {
        imageService.deleteImage(id);
        return "";
    }
}
