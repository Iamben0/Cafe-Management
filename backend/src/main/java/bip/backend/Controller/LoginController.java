package bip.backend.Controller;

import bip.backend.Entity.UserAccount;
import bip.backend.Entity.UserProfile;
import bip.backend.Repository.UserAccountRepository;
import bip.backend.Repository.UserProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/")
public class LoginController {

    private final UserAccountRepository userAccountRepository;
    private final ObjectMapper objectMapper;

    public LoginController(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
        this.objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());
    }

    @PostMapping("/")
    public ResponseEntity<String> enterCredentialsProfileType(@RequestBody String json) {
        try {
            JsonNode jsonNode = objectMapper.readTree(json);
            String username = jsonNode.get("username").asText();
            String password = jsonNode.get("password").asText();
            // create profile type
            String response = UserAccount.verifyUserAccount(username, password, profileType, userAccountRepository);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}