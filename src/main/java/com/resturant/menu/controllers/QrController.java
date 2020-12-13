package com.resturant.menu.controllers;

import com.resturant.menu.models.QrCode;
import com.resturant.menu.services.QrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QrController {
    QrService qrService;

    @Autowired
    QrController(QrService qrService) {
        this.qrService = qrService;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/QrCodes")
    public QrCode getQrCode(@RequestBody QrCode code) {
        return qrService.getQrCode(code);
    }
}
