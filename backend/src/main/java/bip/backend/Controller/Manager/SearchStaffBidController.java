package bip.backend.Controller.Manager;

import bip.backend.Entity.Bid;
import bip.backend.Entity.UserAccount;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/manager/view/staff-bid/search/")
public class SearchStaffBidController {
    @GetMapping("/{name}/")
    public ResponseEntity<String> submitSearchCriteria(@PathVariable String name)
    {
        try {
            return ResponseEntity.ok(new Bid().retrievesStaffBid(name));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}