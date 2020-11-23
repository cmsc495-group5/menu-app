import net.glxn.qrgen.QRCode;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class QRgen extends JPanel implements ActionListener {

    private final JButton genButton;
    private final JLabel tableLabel;
    private JComboBox tableNumber;
    private String barcodeText;
    private JLabel qrImage;

    public QRgen() {
        //construct preComponents
        Integer[] tableNumberItems = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        //construct components
        genButton = new JButton("Generate");
        tableLabel = new JLabel("Table #");
        tableNumber = new JComboBox(tableNumberItems);
        qrImage = new JLabel("QR Code Here");

        //adjust size and set layout
        setPreferredSize(new Dimension(600, 800));
        setLayout(null);

        //add components
        add(genButton);
        add(tableLabel);
        add(tableNumber);
        add(qrImage);

        //set component bounds (only needed by Absolute Positioning)
        genButton.setBounds(435, 100, 100, 20);
        tableLabel.setBounds(100, 100, 50, 25);
        tableNumber.setBounds(255, 100, 100, 25);
        qrImage.setBounds(175,300,250,250);

        genButton.addActionListener(this);
    }

    public void actionPerformed(ActionEvent e) {
        Integer tableNum = (Integer) tableNumber.getSelectedItem();
        switch (tableNum) {
            case 1:
                barcodeText = "menu.com/table1";
                break;
            case 2:
                barcodeText = "menu.com/table2";
                break;
            case 3:
                barcodeText = "menu.com/table3";
                break;
            case 4:
                barcodeText = "menu.com/table4";
                break;
            case 5:
                barcodeText = "menu.com/table5";
                break;
            case 6:
                barcodeText = "menu.com/table6";
                break;
            case 7:
                barcodeText = "menu.com/table7";
                break;
            case 8:
                barcodeText = "menu.com/table8";
                break;
            case 9:
                barcodeText = "menu.com/table9";
                break;
            case 10:
                barcodeText = "menu.com/table10";
                break;
        }
        ByteArrayOutputStream stream = QRCode
                .from(barcodeText)
                .withSize(250, 250)
                .stream();
        ByteArrayInputStream bis = new ByteArrayInputStream(stream.toByteArray());
        BufferedImage qrBuff = null;
        try {
            qrBuff = ImageIO.read(bis);
        } catch (IOException ex) {
            Logger.getLogger(QRgen.class.getName()).log(Level.SEVERE, null, ex);
        }
        Icon qrIcon = new ImageIcon(qrBuff);
        qrImage.setIcon(qrIcon);
    }

    public static void main(String[] args) {
        JFrame frame = new JFrame("QR Code");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.getContentPane().add(new QRgen());
        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }
}
