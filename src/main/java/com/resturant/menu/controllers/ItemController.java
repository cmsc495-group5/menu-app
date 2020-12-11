package com.resturant.menu.controllers;

import com.resturant.menu.models.Image;
import com.resturant.menu.models.Item;
import com.resturant.menu.services.ImageService;
import com.resturant.menu.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
public class ItemController {
    ItemService itemService;
    ImageService imageService;

    @Autowired
    public ItemController(ItemService itemService, ImageService imageService){
        this.imageService = imageService;
        this.itemService = itemService;
    }

    @RequestMapping(method= RequestMethod.GET, value="/items")
    public Iterable<Item> item(){
        return itemService.getItems();
    }

    @RequestMapping(method=RequestMethod.POST, value="/items")
    public Item save(@RequestBody Item item) {
        item.setUpdated(new Date().toString());

        switch (item.getImgID()) {
            case "0":
                item.setImgID("");

                itemService.saveItem(item);
                return item;
            case "1":
                String n = item.getImg().get("name").toString();

                // Save the image and return the id to the item object
                item.setImgID(imageService.saveImage(new Image(n, item.getImg().get("src").toString())).getId());
                item.setImg(null);

                itemService.saveItem(item);
                return item;
            default:
                item.setImgID(item.getImgID());
                item.setImg(null);

                itemService.saveItem(item);
                return item;
        }
    }

    @RequestMapping(method=RequestMethod.GET, value="/items/{id}")
    public Optional<Item> show(@PathVariable String id) {
        return itemService.getItemById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/items/{id}")
    public Item update(@PathVariable String id, @RequestBody Item item) {
        return itemService.updateItem(id, item);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/items/{id}")
    public String delete(@PathVariable String id) {
        itemService.deleteItem(id);
        return "";
    }
}