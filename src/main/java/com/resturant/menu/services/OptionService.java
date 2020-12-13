/*
 * file Name: OptionService.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Service interface for Item Options
 */

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
