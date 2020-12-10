package com.resturant.menu.services;

import com.resturant.menu.models.Image;

import java.util.Optional;

public interface ImageService {
    Iterable<Image> getImages();
    Image saveImage(Image image);
    Image updateImage(String id, Image image);
    Optional<Image> getImageById(String id);
    String deleteImage(String id);
    Image getImageByName(String name);
}
