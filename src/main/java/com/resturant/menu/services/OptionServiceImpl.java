/*
 * file Name: OptionServiceImpl.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Implementation of the Item Options service interface
 */

package com.resturant.menu.services;

import com.resturant.menu.models.Option;
import com.resturant.menu.repositories.OptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class OptionServiceImpl implements OptionService {

    private final OptionsRepository optionsRepository;

    @Autowired
    public OptionServiceImpl(OptionsRepository optionsRepository) {
        this.optionsRepository = optionsRepository;
    }

    public Iterable<Option> getOptions() {
        return optionsRepository.findAll();
    }

    public Option saveOption(Option option) {
        option.setUpdated(new Date().toString());
        optionsRepository.save(option);
        return option;
    }

    public Optional<Option> getOptionById(String id) {
        return optionsRepository.findById(id);
    }

    public Option updateOption(String id, Option option) {
        Optional<Option> optOption = optionsRepository.findById(id);
        Option optionToUpdate = optOption.get();

        if (option.getName() != null) {
            optionToUpdate.setName(option.getName());
        }

        if (option.getDescription() != null) {
            optionToUpdate.setDescription(option.getDescription());
        }

        if (option.getInternalDescription() != null) {
            optionToUpdate.setInternalDescription(option.getInternalDescription());
        }

        if (option.getPrice() != null) {
            optionToUpdate.setPrice(option.getPrice());
        }

        if (option.getImage() != null) {
            optionToUpdate.setImage(option.getImage());
        }

        optionToUpdate.setUpdated(new Date().toString());
        optionsRepository.save(optionToUpdate);
        return optionToUpdate;
    }

    public String deleteOption(String id) {
        Optional<Option> optOption = optionsRepository.findById(id);
        Option option = optOption.get();
        optionsRepository.delete(option);
        return "";
    }
}
