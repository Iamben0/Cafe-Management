package bip.backend.Controller.Admin;

import bip.backend.Entity.UserAccount;
import bip.backend.Entity.UserProfile;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/view")
public class ViewUserAccountController {

    @GetMapping("/user-accounts/")
    public ResponseEntity<String> viewUserAccount() {
        try {
              UserAccount userAccount = new UserAccount();
                return ResponseEntity.ok(userAccount.viewUserAcc());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
