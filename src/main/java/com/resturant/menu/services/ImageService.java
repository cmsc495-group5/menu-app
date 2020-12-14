/*
 * file Name: ImageService.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Service interface for Images
 */

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
