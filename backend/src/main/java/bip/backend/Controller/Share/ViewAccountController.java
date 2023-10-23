package bip.backend.Controller.Share;

import bip.backend.Entity.UserAccount;
import bip.backend.Repository.UserAccountRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/")
public class ViewAccountController {

    private final UserAccountRepository userAccountRepository;
    private final ObjectMapper objectMapper;

    public ViewAccountController(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
        this.objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    }

    @PostMapping("/haha")
    public ResponseEntity<String> viewOwnAccount(@RequestBody String json) {
//        try {
        return null;
    }
}