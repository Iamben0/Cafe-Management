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
@RequestMapping("/system-admin/create")
public class CreateUserAccountController {


    @PostMapping("/user-account")
    public ResponseEntity<String> submitUserAcctDetails(@RequestBody String json) {
        try {
            System.out.println("submitUserAcctDetails is called.");
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(json);
            new UserAccount().createUserAcct(
                    jsonNode.get("username").asText(),
                    jsonNode.get("name").asText(),
                    jsonNode.get("password").asText(),
                    jsonNode.get("email").asText(),
                    jsonNode.get("jobTitle").asText()
            );
            return ResponseEntity.ok("User Account created!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}