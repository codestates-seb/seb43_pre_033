package com.seb33.digitalWizardserver.question.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageService {

    @Value("${image.upload.dir}")
    private String imageUploadDir;

    public String saveImage(byte[] imageData) throws IOException {
        String fileName = System.currentTimeMillis() + ".png";
        Path uploadPath = Paths.get(imageUploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        try (OutputStream outputStream = Files.newOutputStream(uploadPath.resolve(fileName))) {
            outputStream.write(imageData);
            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/images/")
                    .path(fileName)
                    .toUriString();
            return fileUrl;
        } catch (IOException e) {
            throw new IOException("Failed to save image file: " + fileName, e);
        }
    }
}