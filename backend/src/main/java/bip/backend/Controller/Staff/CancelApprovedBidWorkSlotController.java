package bip.backend.Controller.Staff;

import bip.backend.Entity.Bid;
import bip.backend.Entity.WorkSlot;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/staff/cancel/approved-bid-work-slots")
public class CancelApprovedBidWorkSlotController {
    @DeleteMapping("/{bidId}/")
    public ResponseEntity<String> cancelApprovedBidWorkSlot(@PathVariable int bidId) {
        try {
            new Bid().cancelApprovedBidWorkSlot(bidId);
            return ResponseEntity.ok("Cancelled Successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}