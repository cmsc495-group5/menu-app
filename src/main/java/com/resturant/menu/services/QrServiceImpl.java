/*
 * file Name: QrServiceImpl.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Implementation of the QR service interface
 */

package com.resturant.menu.services;

import com.resturant.menu.models.QrCode;
import net.glxn.qrgen.QRCode;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Base64;

@Service
public class QrServiceImpl implements QrService {

    public QrCode getQrCode(QrCode code) {
        String url = code.getBaseUrl() + "/menu?table=" + code.getTableId();
        String image = getQRCodeImage(url, 600, 600);
        return new QrCode(image, code.getTableId(), url, code.getBaseUrl());
    }

    private String getQRCodeImage(String text, int width, int height) {
        try {
            ByteArrayOutputStream stream = QRCode
                    .from(text)
                    .withSize(width, height)
                    .stream();

            byte[] pngData = stream.toByteArray();

            String encoded = Base64.getEncoder().encodeToString(pngData);
            String img = "data:image/jpeg;base64," + encoded;
            return img;
        } catch (Exception e) {
            return "";
        }
    }
}
