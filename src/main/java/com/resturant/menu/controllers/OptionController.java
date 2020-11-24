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
    public OptionController(OptionService optionService){
        this.optionService = optionService;
    }

    @RequestMapping(method= RequestMethod.GET, value="/options")
    public Iterable<Option> option(){
        return optionService.getOptions();
    }

    @RequestMapping(method=RequestMethod.POST, value="/options")
    public Option save(@RequestBody Option option){
        option.setUpdated(new Date().toString());
        optionService.saveOption(option);
        return option;
    }

    @RequestMapping(method=RequestMethod.GET, value="/options/{id}")
    public Optional<Option> show(@PathVariable String id) {
        return optionService.getOptionById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/options/{id}")
    public Option update(@PathVariable String id, @RequestBody Option option) {
        return optionService.updateOption(id, option);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/options/{id}")
    public String delete(@PathVariable String id) {
        optionService.deleteOption(id);
        return "";
    }
}