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
    public Iterable<Image> image() {
        return imageService.getImages();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/images")
    public Image save(@RequestBody Image image) {
        imageService.saveImage(image);
        return image;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/images/{id}")
    public Optional<Image> show(@PathVariable String id) {
        return imageService.getImageById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/images/{id}")
    public Image update(@PathVariable String id, @RequestBody Image image) {
        return imageService.updateImage(id, image);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/images/{id}")
    public String delete(@PathVariable String id) {
        imageService.deleteImage(id);
        return "";
    }
}
