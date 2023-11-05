package bip.backend.Controller.Share;

import bip.backend.Repository.UserAccountRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/")
public class ViewAccountController {
    @PostMapping("/haha")
    public ResponseEntity<String> viewOwnAccount(@RequestBody String json) {
//        try {
        return null;
    }
}