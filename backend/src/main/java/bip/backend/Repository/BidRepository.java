package bip.backend.Repository;

import bip.backend.Entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface BidRepository extends JpaRepository<Bid, Integer> {
    Bid findByWorkSlotId(Integer workSlot_id);

    boolean existsByWorkSlotId(int i);

    boolean existsByWorkSlotIdAndStaffId(int i, int i1);

    boolean existsByStaffId(int i);

    Bid findByStaffId(Integer staff_id);
}