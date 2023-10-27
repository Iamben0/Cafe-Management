package bip.backend.Controller.Admin;

import bip.backend.Entity.UserAccount;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/update/user-account")
public class UpdateUserAccountController {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PutMapping("/{username}/")
    public ResponseEntity<String> updateUserAccount(@PathVariable String username,
                                                    @RequestBody String json) {
        try {
            JsonNode jsonNode = objectMapper.readTree(json);

            new UserAccount().updateUserAccount(
                    username,
                    jsonNode.get("username").asText(),
                    jsonNode.get("name").asText(),
                    jsonNode.get("password").asText(),
                    jsonNode.get("email").asText()
            );

            return ResponseEntity.ok("Account Updated!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}