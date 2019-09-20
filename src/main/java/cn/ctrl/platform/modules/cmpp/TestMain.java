package cn.ctrl.platform.modules.cmpp;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by qq:599097707 轻舟 on 2017/12/5/005.
 */
public class TestMain {
    public static Socket socket;
    public static String IP="134.51.216.56";//服务器IP
    public static int port=7890;//端口号
    public static String spid="915953";//企业代码 和 spid 一样
    public static String secret="Ghhd_0531";//
    public static DataInputStream in;
    public static DataOutputStream out;


    /***
     * 创建指定地址socket连接
     * @return
     */
    public static Socket getSocketInstance(){
        try {
            socket=new Socket(IP,port);
            socket.setKeepAlive(true);
            socket.setSoTimeout(10000);
        } catch (UnknownHostException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return socket;
    }

    /***
     * connect初始化连接服务器
     * @throws IOException
     */
    public static void connectISMG() throws IOException{
        System.out.println("正在连接到服务器"+IP);
        CMPP_CONNECT connect=new CMPP_CONNECT();

        connect.setTotalLength(12+6+16+1+4);
        connect.setCommandId(0x00000001);//请求连接
        connect.setSequenceId(MsgUtils.getSequence());
        connect.setSourceAddr(spid);//源地址，此处为SP_Id，即SP的企业代码。

        String timestamp=MsgUtils.getTimestamp();
        connect.setAuthenticatorSource(MsgUtils.getAuthenticatorSource(spid, secret, timestamp));//用于鉴别源地址。其值通过单向MD5 hash计算得出
        connect.setTimestamp(Integer.parseInt(timestamp));//时间戳的明文,由客户端产生,格式为MMDDHHMMSS，即月日时分秒，10位数字的整型，右对齐 。
        //connect.setVersion((byte)0x20);//双方协商的版本号(高位4bit表示主版本号,低位4bit表示次版本号)
        connect.setVersion((byte)0x14);//双方协商的版本号(高位4bit表示主版本号,低位4bit表示次版本号)
        List<byte[]> dataList=new ArrayList<byte[]>();
        dataList.add(connect.toByteArray());
        out=new DataOutputStream(getSocketInstance().getOutputStream());
        if(out!=null&&null!=dataList){
            for(byte[]data:dataList){
                out.write(data);
                out.flush();
                System.out.println("connect数据发送完成");
            }
        }
        in=new DataInputStream(socket.getInputStream());
        int len=in.readInt();
        List<byte[]> getData=new ArrayList<byte[]>();
        if(null!=in&&0!=len){
            byte[] data=new byte[len-4];
            in.read(data);
            getData.add(data);
            for(byte[] returnData:getData){
                Message_Header header=new Message_Header(returnData);
                switch(header.getCommandId()){
                    case 0x80000001:
                        CMPP_CONNECT_RESP connectResp=new CMPP_CONNECT_RESP(returnData);
                        CMPP_CODEMSG codeMsg=new CMPP_CODEMSG();
                        String code=String.valueOf(connectResp.getStatus());
                        String msg=codeMsg.getCodeMsg(code);
                        System.out.println("CMPP初始化链接状态值["+code+"]=>"+msg);
                }
            }
        }

    }

    /***
     * 发送短短信
     * @param msg
     * @param phoneNumber
     * @throws IOException
     */
    public static void sendShortMsg(String msg,String phoneNumber) throws IOException{
        int seq=MsgUtils.getSequence();
        try {
            byte[] msgByte=msg.getBytes("gb2312");
            CMPP_SUBMIT submit=new CMPP_SUBMIT();

            submit.setTotalLength(159+msgByte.length);
            submit.setCommandId(0x00000004);//提交短信
            submit.setSequenceId(seq);
            submit.setMsg_Id(0x10123);//信息标识，由SP接入的短信网关本身产生，本处填空。
            submit.setMsg_src(spid);//账户 信息内容来源(SP_Id)
            submit.setSrc_Id("0");//通道号 源号码  SP的服务代码或前缀为服务代码的长号码,
            // 网关将该号码完整的填到SMPP协议Submit_SM消息相应的source_addr字段，
            // 该号码最终在用户手机上显示为短消息的主叫号码
            submit.setFee_terminal_Id("18765155509");//被计费用户的号码
            submit.setDest_terminal_Id(phoneNumber);//接收短信的MSISDN号码
            submit.setMsg_Length((byte)msgByte.length);//信息长度(Msg_Fmt值为0时：<160个字节；其它<=140个字节)
            submit.setMsg_Content(msgByte);//信息内容
            List<byte[]> dataList=new ArrayList<byte[]>();
            dataList.add(submit.toByteArray());
            System.out.println("111===>phoneNumber:::"+phoneNumber);
            if(out!=null&&null!=dataList){
                for(byte[]data:dataList){
                    out.write(data);
                    out.flush();
                    System.out.println("submit数据发送完成");
                }
            }

            in=new DataInputStream(socket.getInputStream());
            int len=in.readInt();
            List<byte[]> getData=new ArrayList<byte[]>();
            if(null!=in&&0!=len){
                byte[] data=new byte[len-4];
                in.read(data);
                getData.add(data);
                for(byte[] returnData:getData){
                    Message_Header header=new Message_Header(returnData);
                    System.out.println("header.getCommandId():::"+header.getCommandId());
                    switch(header.getCommandId()){
                        case 0x80000004:
                            CMPP_SUBMIT_RESP submitResp=new CMPP_SUBMIT_RESP(returnData);
                            System.out.println("submitresp状态值"+submitResp.getResult());
                            System.out.println("submitresp流水号值"+submitResp.getMsg_Id());

                            CMPP_CODEMSG codeMsg=new CMPP_CODEMSG();
                            String codeStr=String.valueOf(submitResp.getResultInt());;
                            String msgStr=codeMsg.getCodeMsg(codeStr);
                            System.out.println("CMPP返回===>：["+codeStr+"]=>"+msgStr);
                    }


                }
            }
        } catch (UnsupportedEncodingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }


    /***
     * 获取上行及状态报告回执信息
     * @throws IOException
     */
    public static void CMPP_DELIVER() throws IOException{
        in=new DataInputStream(socket.getInputStream());
        int len=in.readInt();
        List<byte[]> getData=new ArrayList<byte[]>();
        if(null!=in&&0!=len){
            byte[] data=new byte[len-4];
            in.read(data);
            getData.add(data);
            for(byte[] returnData:getData){
                System.out.println("获取状态报告中......");
                CMPP_DELIVER deliver=new CMPP_DELIVER(returnData);
                System.out.println(returnData.length);
                switch(deliver.getCommandId()){
                    case 0x00000005:
                        CMPP_SUBMIT_RESP submitResp=new CMPP_SUBMIT_RESP(returnData);
                        System.out.println("CMPP_DELIVER状态值"+deliver.getStat());
                        System.out.println("CMPP_DELIVER流水号值"+deliver.getMsg_Id2());
                }


            }
        }
    }

    /***
     * 长连接链路检测
     * @throws IOException
     */
    public static void CMPP_ACTIVE_TEST() throws IOException{
        Message_Header header=new Message_Header();
        header.setTotalLength(12);
        header.setCommandId(0x00000008);
        header.setSequenceId(MsgUtils.getSequence());
        List<byte[]> dataList=new ArrayList<byte[]>();
        dataList.add(header.toByteArray());
        if(out!=null&&null!=dataList){
            for(byte[]data:dataList){
                out.write(data);
                out.flush();
                System.out.println("长连接链路检测中......");
            }
        }
    }


    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        try {
            connectISMG();//连接cmpp
            sendShortMsg("发送cmpp短信测试","18765155509");
           /* if(in!=null){
                int a=0;
                try {
                    while (true) {
                        //CMPP_DELIVER();//上行接收
                        CMPP_ACTIVE_TEST();
                        Thread.sleep(1000*3);//3秒查一次
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }*/
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

}
