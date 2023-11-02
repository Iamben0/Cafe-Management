package bip.backend.Controller.Staff;

import bip.backend.Entity.Bid;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/staff/view/approved-bid-work-slots")
public class ViewApprovedBidWorkSlotController {
    @GetMapping("/{staffId}/")
    public ResponseEntity<String> viewApprovedBidWorkSlot(@PathVariable int staffId) {
        try {
            return ResponseEntity.ok(new Bid().viewApprovedBidWorkSlot(staffId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
