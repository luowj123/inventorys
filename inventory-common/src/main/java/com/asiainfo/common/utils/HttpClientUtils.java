package com.asiainfo.common.utils;

import com.asiainfo.common.utils.convert.BeanConversionsUtils;
import com.asiainfo.common.utils.json.JSON;
import com.asiainfo.common.utils.text.Convert;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * HttpClientUtils class
 *
 * @author zhouc
 * date: 2019/8/19
 */
public class HttpClientUtils {
    private static Logger log = LoggerFactory.getLogger(HttpClientUtils.class);
    public static final String XML_TYPE = "text/xml";
    public static final String JSON_TYPE = "application/json";
    public static final String TEXT_TYPE = "application/text";
    public static final String FORM_TYPE = "application/x-www-form-urlencoded";

    /**
     * 请求post方法
     *
     * @param type          请求类型 支持 xml json  表单
     * @param url
     * @param requestEntity 请求实体
     * @param kClass        返回实体class名
     * @param <T>
     * @param <K>
     * @return {@code Object[]}
     * @throws Exception
     */
    public static <T, K> K sendPost(String type, String url, T requestEntity, Class<K> kClass) throws Exception {
        Object[] objects = new Object[2];
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost httpPost = new HttpPost(url);
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectTimeout(15000)//一、连接超时：connectionTimeout-->指的是连接一个url的连接等待时间
                .setSocketTimeout(5000)// 二、读取数据超时：SocketTimeout-->指的是连接上一个url，获取response的返回等待时间
                .setConnectionRequestTimeout(5000)
                .build();
        httpPost.setHeader("Content-Type", type);
        StringEntity stringEntity = null;
        if (type.equals(FORM_TYPE)) {
            List<NameValuePair> params = new ArrayList();
            Field[] declaredFields = requestEntity.getClass().getDeclaredFields();
            for (Field field : declaredFields) {
                field.setAccessible(true);
                params.add(new BasicNameValuePair(field.getName(), field.get(requestEntity).toString()));
            }
            stringEntity = new UrlEncodedFormEntity(params, "UTF-8");
        }else if(type.equals(TEXT_TYPE)){
            stringEntity = new StringEntity(requestEntity.toString());
            stringEntity.setContentEncoding("UTF-8");
            System.out.println(requestEntity.toString());
        }else if(type.equals(XML_TYPE)){
            //目前xml只能传String
            stringEntity = new StringEntity(requestEntity.toString());
            stringEntity.setContentEncoding("UTF-8");

        }else{
            String marshal = JSON.marshal(requestEntity);
            log.info("show marshal:" + marshal);
            stringEntity = new StringEntity(marshal);
            stringEntity.setContentEncoding("UTF-8");
        }
        httpPost.setEntity(stringEntity);
        httpPost.setConfig(requestConfig);
        CloseableHttpResponse execute = httpClient.execute(httpPost);
        HttpEntity entity = execute.getEntity();
        String xx = EntityUtils.toString(entity, "UTF-8");
        log.info("收到回执消息："+xx);
        K response = null;
        if (type.equals(JSON_TYPE) || type.equals(FORM_TYPE) || type.equals(TEXT_TYPE)) {
            response = JSON.unmarshal(xx, kClass);
        } else if (type.equals(XML_TYPE)) {
            response = BeanConversionsUtils.xmlToBeanUseJackson(xx, kClass);
        }
        execute.close();
        httpClient.close();
        return response;
    }

    /**
     * 请求post方法
     *
     * @param type          请求类型 支持 xml json  表单
     * @param url
     * @param requestEntity 请求实体
     * @param kClass        返回实体class名
     * @param <T>
     * @param <K>
     * @return {@code Object[]}
     * @throws Exception
     */
    public static <T, K> K sendPost(String type, String url, T requestEntity, Class<K> kClass,Map<String,String> headers) throws Exception {
        Object[] objects = new Object[2];
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost httpPost = new HttpPost(url);
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectTimeout(50000)//一、连接超时：connectionTimeout-->指的是连接一个url的连接等待时间
                .setSocketTimeout(50000)// 二、读取数据超时：SocketTimeout-->指的是连接上一个url，获取response的返回等待时间
                .setConnectionRequestTimeout(50000)
                .build();
        httpPost.setHeader("Content-Type", type);
        if(headers != null && !headers.isEmpty()){
            Set<String> keys = headers.keySet();
            for(String key:keys){
                httpPost.setHeader(key, Convert.toStr(headers.get(key)));
            }
        }
        StringEntity stringEntity = null;
        if (type.equals(FORM_TYPE)) {
            List<NameValuePair> params = new ArrayList();
            Field[] declaredFields = requestEntity.getClass().getDeclaredFields();
            for (Field field : declaredFields) {
                field.setAccessible(true);
                params.add(new BasicNameValuePair(field.getName(), field.get(requestEntity).toString()));
            }
            stringEntity = new UrlEncodedFormEntity(params, "UTF-8");
        }else if(type.equals(TEXT_TYPE)){
            stringEntity = new StringEntity(requestEntity.toString());
            stringEntity.setContentEncoding("UTF-8");
            System.out.println(requestEntity.toString());
        }else if(type.equals(XML_TYPE)){
              //目前xml只能传String
            stringEntity = new StringEntity(requestEntity.toString());
            stringEntity.setContentEncoding("UTF-8");

        }else{
            String marshal = JSON.marshal(requestEntity);
            log.info("show marshal:" + marshal);
            stringEntity = new StringEntity(marshal);
            stringEntity.setContentEncoding("UTF-8");
        }
        httpPost.setEntity(stringEntity);
        httpPost.setConfig(requestConfig);
        CloseableHttpResponse execute = httpClient.execute(httpPost);
        HttpEntity entity = execute.getEntity();
        String xx = EntityUtils.toString(entity, "UTF-8");
        log.info("收到回执消息："+xx);
        K response = null;
        if (type.equals(JSON_TYPE) || type.equals(FORM_TYPE) || type.equals(TEXT_TYPE)) {
            response = JSON.unmarshal(xx, kClass);
        } else if (type.equals(XML_TYPE)) {
            response = BeanConversionsUtils.xmlToBeanUseJackson(xx, kClass);
        }
        execute.close();
        httpClient.close();
        return response;
    }

    /**
     * 发送get请求
     *
     * @param url
     * @param requestEntity
     * @param kClass
     * @param <T>
     * @param <K>
     * @return
     * @throws Exception
     */
    public static <T, K> K sendGet(String url, T requestEntity, Class<K> kClass) throws Exception {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        Field[] declaredFields = requestEntity.getClass().getDeclaredFields();
        for (Field field : declaredFields) {
            field.setAccessible(true);
            params.add(new BasicNameValuePair(field.getName(), field.get(requestEntity).toString()));
        }
        //参数转换为字符串
        String paramsStr = EntityUtils.toString(new UrlEncodedFormEntity(params, "UTF-8"));
        url += "?" + paramsStr;
        // 创建httpget.
        HttpGet httpget = new HttpGet(url);
        log.info("executing request " + httpget.getURI());
        // 执行get请求.
        CloseableHttpResponse closeableHttpResponse = httpclient.execute(httpget);
        HttpEntity entity = closeableHttpResponse.getEntity();
        String xx = EntityUtils.toString(entity);
        K response = JSON.unmarshal(xx, kClass);
        closeableHttpResponse.close();
        httpclient.close();
        return response;
    }
}
