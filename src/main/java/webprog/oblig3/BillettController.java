package webprog.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class BillettController {

    @Autowired
    public BillettRepository rep;

    @GetMapping("/hentFilmer")
    public ArrayList<String> hentFilmer() {
        ArrayList<String> filmliste = new ArrayList<>();
        filmliste.add("Oppenheimer");
        filmliste.add("Barbie");
        filmliste.add("Anyone Like You");
        filmliste.add("Dune");
        return filmliste;
    }

    @PostMapping("/lagre")
    public void lagreBillett(Billett innBillett) {
        rep.lagreBillett(innBillett);
    }

    @GetMapping("/hentBilletter")
    public List<Billett> hentBilletter() {
        List<Billett> billetter = rep.hentBilletter();
        Collections.sort(billetter, Comparator.comparing(Billett::getEtternavn));
        return billetter;
    }

    @GetMapping("/hentEnBillett")
    public Billett hentEnBillett(int id) {
        return rep.hentEnBillett(id);
    }

    @PostMapping("/endreEnBillett")
    public void endreEnBillett(Billett billett) {
        rep.endreEnBillett(billett);
    }

    @GetMapping("/slettEnBillett")
    public void slettEnBillett(int id) {
        rep.slettEnBillett(id);
    }

    @GetMapping("/slettAlle")
    public void slettAlle() {
        rep.slettBilletter();
    }
}
