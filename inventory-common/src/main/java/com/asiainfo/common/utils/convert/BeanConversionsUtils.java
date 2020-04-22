package com.asiainfo.common.utils.convert;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.thoughtworks.xstream.XStream;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * BeanXMLInterConversionsUtils class
 *
 * @author zhouc
 * date: 2019/8/13
 */
public class BeanConversionsUtils {
    private static XmlMapper xmlMapper = new XmlMapper();
    private static ObjectMapper objectMapper = new ObjectMapper();

    /**
     * 使用XStream将bean转换为xml文件
     *
     * @param data
     * @return
     */
    @Deprecated
    public static String beanToXMLUseXStream(Object data) {
        XStream xstream = new XStream();
        xstream.registerConverter(new NullConverter());
        xstream.autodetectAnnotations(true);
        String xml = xstream.toXML(data);
        return xml;
    }

    /**
     * bean 转换为 xml
     *
     * @param data
     * @return
     * @throws IOException
     */
    public static String beanToXmlUseJackson(Object data) throws IOException {
        xmlMapper.enable(SerializationFeature.INDENT_OUTPUT);
        String xml = xmlMapper.writeValueAsString(data);
        return xml;
    }

    /**
     * xml 转换为 bean
     *
     * @param xml
     * @param tclass
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T xmlToBeanUseJackson(String xml, Class<T> tclass) throws IOException {
        T t = xmlMapper.readValue(xml, tclass);
        return t;
    }

    /**
     * List<String>转换为List<T>
     *
     * @param list
     * @param tclass
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> List<T> listToListUseJackson(List list, Class<T> tclass) throws IOException {
        List<T> tList = new ArrayList<>();
        for (int i = 0; i < list.size(); i++) {
            Object o = list.get(i);
            String s1 = objectMapper.writeValueAsString(o);
            T t = objectMapper.readValue(s1, tclass);
            tList.add(t);
        }
        return tList;
    }
}