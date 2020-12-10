package com.resturant.menu.services;

import com.resturant.menu.models.Image;
import com.resturant.menu.repositories.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {
    private ImageRepository imageRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) { this.imageRepository = imageRepository; }

    @Override
    public Iterable<Image> getImages() { return imageRepository.findAll(); }

    @Override
    public Image saveImage(Image image) {
        System.out.println("saving image!");
        imageRepository.save(image);

        return image;
    }

    @Override
    public Image updateImage(String id, Image image) {
        Optional<Image> optImg = imageRepository.findById(id);
        Image img = optImg.get();

        if (image.getImage() != null) img.setImage(img.getImage());
        if (image.getName() != null) img.setName(img.getName());

        imageRepository.save(img);

        return img;
    }

    @Override
    public Optional<Image> getImageById(String id) {
        return imageRepository.findById(id);
    }

    // Used in itemController.java:save()
    @Override
    public Image getImageByName(String name) {
        Iterable<Image> images = getImages();

        for (Image i : images) if (i.getName().equals(name)) return i;

        return null;
    }

    @Override
    public String deleteImage(String id) {
        Optional<Image> optImage = imageRepository.findById(id);
        Image temp = optImage.get();

        imageRepository.delete(temp);

        return null;
    }
}
