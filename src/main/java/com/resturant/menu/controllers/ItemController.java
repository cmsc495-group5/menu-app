/*
 * file Name: ItemController.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Controller for Item related functions
 */

package com.resturant.menu.controllers;

import com.resturant.menu.models.Item;
import com.resturant.menu.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
public class ItemController {
    ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/items")
    public Iterable<Item> getItems() {
        return itemService.getItems();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/items")
    public Item saveItem(@RequestBody Item item) {
        item.setUpdated(new Date().toString());
        itemService.saveItem(item);
        return item;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/items/{id}")
    public Optional<Item> getItem(@PathVariable String id) {
        return itemService.getItemById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/items/{id}")
    public Item updateItem(@PathVariable String id, @RequestBody Item item) {
        return itemService.updateItem(id, item);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/items/{id}")
    public String deleteItem(@PathVariable String id) {
        itemService.deleteItem(id);
        return "";
    }
}
