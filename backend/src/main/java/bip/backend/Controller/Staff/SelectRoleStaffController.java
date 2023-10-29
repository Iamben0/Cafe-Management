package bip.backend.Controller.Staff;

import bip.backend.Entity.UserAccount;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/update/user-account-role")
public class SelectRoleStaffController {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PutMapping("/{username}/")
    public ResponseEntity<String> selectRole(@PathVariable String username,
                                             @RequestBody String json) {
        try {
            JsonNode jsonNode = objectMapper.readTree(json);

            new UserAccount().selectRole(
                    username,
                    jsonNode.get("role").asText()
            );
            return ResponseEntity.ok("Role Selected!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}