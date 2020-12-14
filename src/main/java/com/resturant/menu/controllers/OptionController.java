/*
 * file Name: OptionController.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Controller for Item Option related functions
 */

package com.resturant.menu.controllers;

import com.resturant.menu.models.Option;
import com.resturant.menu.services.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
public class OptionController {
    OptionService optionService;

    @Autowired
    public OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/options")
    public Iterable<Option> getOptions() {
        return optionService.getOptions();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/options")
    public Option saveOption(@RequestBody Option option) {
        option.setUpdated(new Date().toString());
        optionService.saveOption(option);
        return option;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/options/{id}")
    public Optional<Option> getOption(@PathVariable String id) {
        return optionService.getOptionById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/options/{id}")
    public Option updateOption(@PathVariable String id, @RequestBody Option option) {
        return optionService.updateOption(id, option);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/options/{id}")
    public String deleteOption(@PathVariable String id) {
        optionService.deleteOption(id);
        return "";
    }
}
