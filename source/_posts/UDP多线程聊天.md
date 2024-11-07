---
layout: post
title: UDP多线程聊天
tags:
  - Java
categories: 技术
 
 
date: 2021-12-30 7:58:14
---

## 代码部分

主机一代码：

```java
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class Udp01 {
    public static void main(String[] args) {
        new A() ;
    }
}

class A extends JFrame implements Runnable, ActionListener {
    JTextField outMessage = new JTextField(30);		//输入发送内容的文本框
    JTextArea inMessage = new JTextArea(12, 20);		//输出收到内容的文本区
    JButton button = new JButton("发送");
    JPanel panel = new JPanel();
    A() {
        setBounds(50, 50, 600, 900);
        setVisible(true);
        setTitle("一号机");
        this.getRootPane().setDefaultButton(button);
        button.addActionListener(this);
        panel.add(outMessage);
        panel.add(button);
        add(new JScrollPane(inMessage), BorderLayout.CENTER);
        add(panel, BorderLayout.NORTH);
        Thread thread = new Thread(this);
        validate();
        thread.start();
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    @Override
    public void actionPerformed(ActionEvent e) {		//发送数据
        byte b[] = outMessage.getText().trim().getBytes();

        try {
            InetAddress address = InetAddress.getByName("localhost");	//接收方的IP地址
            DatagramPacket data = new DatagramPacket(b, b.length, address, 4000);	//接收方的端口
            DatagramSocket mail = new DatagramSocket();
            mail.send(data);
        }
        catch(Exception ee) {}
        if(e.getSource()==button){
            inMessage.append("自己发送：");
            inMessage.append(outMessage.getText()+'\n');
            outMessage.setText("");
        }
    }

    @Override
    public void run() { //接收数据
        DatagramPacket pack = null;
        DatagramSocket mail = null;
        byte b[] = new byte [8192];
        try {
            pack = new DatagramPacket(b, b.length);
            mail = new DatagramSocket(3000);    //自己的端口
        }
        catch(Exception e) {}
        while(true) {
            try {
                mail.receive(pack);
                String message = new String(pack.getData(), 0 ,pack.getLength());	//将收到的数据从byte型变为string型
                inMessage.append("收到数据来自："+pack.getAddress()+"\n");	//将数据输出到文本区
                inMessage.append(message+"\n");
                inMessage.setCaretPosition(inMessage.getText().length());	//将光标移动到最后便于下次接收数据从最后开始
            }
            catch(Exception e) {}
        }
    }
}


```

主机二代码：

```java
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;
import java.net.*;

public class Udp02 {
    public static void main(String[] args) {
        new B() ;
    }
}
class B extends JFrame implements Runnable, ActionListener {

    JTextField outMessage = new JTextField(12) ;
    JTextArea inMessage = new JTextArea(12, 20) ;
    JButton button = new JButton("发送") ;
    JPanel panel = new JPanel() ;
    B() {
        setBounds(50, 50, 600, 900) ;
        setVisible(true) ;
        setTitle("二号机");
        this.getRootPane().setDefaultButton(button);
        button.addActionListener(this) ;
        panel.add(outMessage) ;
        panel.add(button) ;
        Container con = getContentPane() ;
        con.add(new JScrollPane(inMessage), BorderLayout.CENTER) ;
        con.add(panel, BorderLayout.NORTH) ;
        Thread thread = new Thread(this) ;
        validate() ;
        thread.start() ;
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }


    @Override
    public void actionPerformed(ActionEvent e) {

        byte b[] = outMessage.getText().trim().getBytes() ;
        try {
            InetAddress address = InetAddress.getByName("localhost") ;	//IP地址是接收方的
            DatagramPacket data = new DatagramPacket(b, b.length, address, 3000) ;	//接收方的端口
            DatagramSocket mail = new DatagramSocket() ;
            mail.send(data) ;
        }
        catch(Exception ee) {}
        if(e.getSource()==button){
            inMessage.append("自己发送：");
            inMessage.append(outMessage.getText()+'\n');
            outMessage.setText("");
        }
    }

    @Override
    public void run() {
        DatagramPacket pack = null ;
        DatagramSocket mail = null ;
        byte b[] = new byte [8192] ;
        try {
            pack = new DatagramPacket(b, b.length) ;
            mail = new DatagramSocket(4000) ;	//自己的端口
        }
        catch(Exception e) {}
        while(true) {
            try {
                mail.receive(pack) ;
                String message = new String(pack.getData(), 0 ,pack.getLength()) ;
                inMessage.append("收到数据来自："+pack.getAddress()+"\n") ;
                inMessage.append(message+"\n") ;
                inMessage.setCaretPosition(inMessage.getText().length()) ;
            }
            catch(Exception e) {}
        }
    }
}



```

## 获取ip和打开端口

> 实现两台电脑的通信需要知道对方ip和端口号，然后分别改写对应部分

- 获取ip方法

  ```
  ipconfig
  ```

  ![image-20220325223412028](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20220325223412028.19dqbe2a7bcw.webp)

- 打开windows端口方法

  > 防火墙-->高级设置-->新建入站规则-->端口-->选择UDP，填写端口号（一般填写范围1024~49151）-->一直下一步-->完成

详细步骤：

{% gallery %}
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20211230085317954.5cyy3husvqo0.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20211230085639649.4hi49xi3v120.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20211230090217114.2ggu1h0a5o00.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20211230090227283.5mqgovg27w00.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20211230090253840.2sikgnn4vkg0.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20211230090304043.62i3wrtvcgs0.webp)
![](https://npm.elemecdn.com/yanqi1711-picx/20220423/image-20211230090333804.2udthubripg0.webp)
{% endgallery %}



## 注意事项

> 主机一和主机二代码基本一样，只需要改对应ip和端口号就行

## 参考文献

[java 按钮响应回车_swing 设置回车响应按钮的方法_刘慈欣的博客-CSDN博客](https://blog.csdn.net/weixin_33657499/article/details/114212729?spm=1035.2023.3001.6557&utm_medium=distribute.pc_relevant_bbs_down.none-task-blog-2~default~OPENSEARCH~default-15.nonecase&depth_1-utm_source=distribute.pc_relevant_bbs_down.none-task-blog-2~default~OPENSEARCH~default-15.nonecase)

[Windows 怎么开放指定端口-百度经验 (baidu.com)](https://jingyan.baidu.com/article/fd8044fa7fc3245030137a49.html)
