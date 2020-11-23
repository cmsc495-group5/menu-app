package com.resturant.menu.services;

import com.resturant.menu.models.Option;

import java.util.Optional;

public interface OptionService {
    Iterable<Option> getOptions();
    Option saveOption(Option item);
    Optional<Option> getOptionById(String id);
    Option updateOption(String id, Option item);
    String deleteOption(String id);
}
