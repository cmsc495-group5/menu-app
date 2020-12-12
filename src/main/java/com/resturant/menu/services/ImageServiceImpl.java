package com.resturant.menu.services;

import com.resturant.menu.models.Image;
import com.resturant.menu.repositories.ImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {
    private final ImagesRepository imagesRepository;

    @Autowired
    public ImageServiceImpl(ImagesRepository imagesRepository) {
        this.imagesRepository = imagesRepository;
    }

    @Override
    public Iterable<Image> getImages() {
        return imagesRepository.findAll();
    }

    @Override
    public Image saveImage(Image image) {
        imagesRepository.save(image);
        return image;
    }

    @Override
    public Optional<Image> getImageById(String id) {
        return imagesRepository.findById(id);
    }

    @Override
    public Image updateImage(String id, Image image) {
        Optional<Image> optImage = imagesRepository.findById(id);
        Image i = optImage.get();

        if (image.getName() != null) {
            i.setName(image.getName());
        }
        if (image.getImage() != null) {
            i.setImage(image.getImage());
        }
        imagesRepository.save(i);
        return i;
    }

    @Override
    public String deleteImage(String id) {
        Optional<Image> optImage = imagesRepository.findById(id);
        Image i = optImage.get();
        imagesRepository.delete(i);
        return "";
    }
}
