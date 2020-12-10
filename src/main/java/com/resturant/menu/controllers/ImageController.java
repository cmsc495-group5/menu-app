package com.resturant.menu.controllers;

import com.resturant.menu.models.Image;
import com.resturant.menu.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;

@RestController
public class ImageController {
    ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @RequestMapping(method= RequestMethod.GET, value="/image")
    public ArrayList<ArrayList> getAllImages() {

        Iterable<Image> imagesTemp = imageService.getImages();
        ArrayList<ArrayList> out = new ArrayList<>();

        for (Image i : imagesTemp) {
            ArrayList<String> temp = new ArrayList<>();

            temp.add(i.getName());
            temp.add(i.getId());
            temp.add(i.getImage());

            out.add(temp);
        }

        return out;
    }
}
