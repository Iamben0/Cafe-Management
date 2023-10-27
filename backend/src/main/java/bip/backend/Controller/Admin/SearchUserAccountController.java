package bip.backend.Controller.Admin;

import bip.backend.Entity.UserAccount;
import bip.backend.Entity.UserProfile;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/system-admin/search/user-account")
public class SearchUserAccountController {
    // Search by job title
    @GetMapping("/{name}/")
    public ResponseEntity<String> submitSearchCriteria(@PathVariable String name)
    {
        try {
            return ResponseEntity.ok(new UserAccount().searchAccount(name));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}