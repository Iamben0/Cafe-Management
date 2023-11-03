package bip.backend.Controller.Manager;

import bip.backend.Entity.Bid;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/manager/view/staff-bid/")
public class ViewStaffBidController {
    @GetMapping("/")
    public ResponseEntity<String> viewStaffBid() {
        try {
            return ResponseEntity.ok(new Bid().viewStaffBid());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
