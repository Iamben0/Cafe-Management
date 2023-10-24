package bip.backend.Controller.Admin;

import bip.backend.Entity.UserAccount;
import bip.backend.Repository.UserAccountRepository;
import bip.backend.Repository.UserProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/create")
public class CreateUserAccountController {

    private final UserProfileRepository userProfileRepository;
    private final UserAccountRepository userAccountRepository;

    public CreateUserAccountController(UserProfileRepository userProfileRepository, UserAccountRepository userAccountRepository) {
        this.userProfileRepository = userProfileRepository;
        this.userAccountRepository = userAccountRepository;
    }

    @PostMapping("/user-account")
    public ResponseEntity<String> submitUserAcctDetails(@RequestBody String json) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(json);
            UserAccount.createUserAcct(
                    jsonNode.get("username").asText(),
                    jsonNode.get("name").asText(),
                    jsonNode.get("password").asText(),
                    jsonNode.get("email").asText(),
                    jsonNode.get("jobTitle").asText(),
                    userProfileRepository,
                    userAccountRepository
            );
            return ResponseEntity.ok("User Account created!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}