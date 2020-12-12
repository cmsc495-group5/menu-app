package com.resturant.menu.services;

import com.resturant.menu.models.Image;

import java.util.Optional;

public interface ImageService {
    Iterable<Image> getImages();

    Image saveImage(Image item);

    Optional<Image> getImageById(String id);

    Image updateImage(String id, Image item);

    String deleteImage(String id);
}
