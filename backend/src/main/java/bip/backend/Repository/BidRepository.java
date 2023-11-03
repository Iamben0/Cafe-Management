package bip.backend.Repository;

import bip.backend.Entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Integer> {
    Bid findByWorkSlotId(Integer workSlot_id);

    boolean existsByWorkSlotId(int i);

    List<Bid> findAllByStaffId(int i);

    List<Bid> findByStaffNameContainsIgnoreCase(String name);
}