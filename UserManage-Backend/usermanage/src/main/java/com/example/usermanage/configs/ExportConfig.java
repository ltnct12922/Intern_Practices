package com.example.usermanage.configs;

import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class ExportConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/ExportExcel/**")
                .addResourceLocations("classpath:/static/ExportExcel/");
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }
}
