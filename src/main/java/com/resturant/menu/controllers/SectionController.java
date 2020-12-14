/*
 * file Name: SectionController.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Controller for Menu section operations
 */

package com.resturant.menu.controllers;

import com.resturant.menu.models.Section;
import com.resturant.menu.services.ItemService;
import com.resturant.menu.services.SectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class SectionController {
    SectionService sectionService;
    ItemService itemService;

    @Autowired
    public SectionController(SectionService sectionService, ItemService itemService) {
        this.sectionService = sectionService;
        this.itemService = itemService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/sections")
    public Iterable<Section> getSections() {
        return sectionService.getSections();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/sections")
    public Section saveSections(@RequestBody Section sec) {
        return sectionService.saveSection(sec);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/sections/{id}")
    public Optional<Section> getSection(@PathVariable String id) {
        return sectionService.getSectionById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/sections/{id}")
    public Section updateSection(@PathVariable String id, @RequestBody Section sec) {
        return sectionService.updateSection(id, sec);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/sections/{id}")
    public String deleteSection(@PathVariable String id) {
        sectionService.deleteSection(id);
        return "";
    }

}
