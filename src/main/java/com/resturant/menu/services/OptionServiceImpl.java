package com.resturant.menu.services;

import com.resturant.menu.models.Option;
import com.resturant.menu.repositories.OptionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class OptionServiceImpl implements OptionService {

    private OptionsRepository optionsRepository;

    @Autowired
    public OptionServiceImpl(OptionsRepository optionsRepository){
        this.optionsRepository = optionsRepository;
    }

    public Iterable<Option> getOptions(){
        return optionsRepository.findAll();
    }

    public Option saveOption(Option sec){
        sec.setUpdated(new Date().toString());
        optionsRepository.save(sec);
        return sec;
    }

    public Optional<Option> getOptionById(String id) {
        return optionsRepository.findById(id);
    }

    public Option updateOption(String id, Option option) {
        Optional<Option> optSec = optionsRepository.findById(id);
        Option s = optSec.get();
        
        if(option.getName() != null){
            s.setName(option.getName());
        }
        
        if(option.getDescription() != null){
            s.setDescription(option.getDescription());
        }
        
        if(option.getInternalDescription() != null){
            s.setInternalDescription(option.getInternalDescription());
        }
        
        if(option.getPrice() != null) {
            s.setPrice(option.getPrice());
        }

        s.setUpdated(new Date().toString());
        optionsRepository.save(s);
        return s;
    }

    public String deleteOption(String id) {
        Optional<Option> optOption = optionsRepository.findById(id);
        Option sec = optOption.get();
        optionsRepository.delete(sec);
        return "";
    }
}
