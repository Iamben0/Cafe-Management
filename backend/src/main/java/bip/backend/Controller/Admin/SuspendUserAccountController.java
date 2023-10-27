package bip.backend.Controller.Admin;

import bip.backend.Entity.UserAccount;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/suspend/user-account")
public class SuspendUserAccountController {

    @DeleteMapping("/{username}/")
    public ResponseEntity<String> suspendUserAccount(@PathVariable String username) {
        try {
            new UserAccount().suspendUserAccount(username);
            return ResponseEntity.ok("Account Suspended!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}