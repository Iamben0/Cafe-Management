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

    @PutMapping("/{oldUsername}/")
    public ResponseEntity<String> updateUserAccount(@PathVariable String oldUsername,
                                                    @RequestBody String json) {
        try {
            JsonNode jsonNode = objectMapper.readTree(json);

            new UserAccount().updateUserAccount(
                    oldUsername,
                    jsonNode.get("newUsername").asText(),
                    jsonNode.get("newName").asText(),
                    jsonNode.get("newPassword").asText(),
                    jsonNode.get("newEmail").asText()
            );

            return ResponseEntity.ok("Account Updated!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}