/*
 * file Name: QrService.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Service interface Qr codes
 */

package com.resturant.menu.services;

import com.resturant.menu.models.QrCode;

public interface QrService {
    QrCode getQrCode(QrCode code);
}
