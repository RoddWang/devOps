package com.hpe.it.sharedservice.devops.platform.utils.mongo;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import net.sf.json.xml.XMLSerializer;

public class ParserUtil {

	public static String XML2JSON(String xmlContent) throws Exception{
		xmlContent=xmlContent.replaceAll("\n", "");
        XMLSerializer xmlSerializer = new XMLSerializer();  
        try{
        	 return xmlSerializer.read(xmlContent).toString();  
        }catch(Exception e)
        {
        	System.out.println(e.getMessage());
        	return xmlContent;
        }
	}
	
	
	

	public static Object getNodeValue(String mappingKey,Map map){
		if(!StringUtils.isEmpty(mappingKey)){

			String[] layeredKeys=mappingKey.trim().split("\\.");
			Map currentMap=map;
			for(int i=0;i<layeredKeys.length;i++){
				if(i!=layeredKeys.length-1)
				{
					try{
						if(currentMap.get(layeredKeys[i])!=null)
							currentMap=(Map) currentMap.get(layeredKeys[i]);
						else {
							return null;
						}
					}catch(Exception e) {
						//System.out.println(e.getMessage());
						BasicDBList list=(BasicDBList) currentMap.get(layeredKeys[i]);
						if(list.size()>0)
							currentMap=(Map) list.get(0);
						else {
							return null;
						}
					}
					
				}else{
					return currentMap.get(layeredKeys[i]);
				}
			}
		}
		
		return null;
	}
	
	public static String appendValue(String[] mappedKeyArray,int curLayer,DBObject dbObject){
		DBObject currentMap=dbObject;
		for(int i=curLayer;i<mappedKeyArray.length;i++){
			if(i!=mappedKeyArray.length-1)
			{
				Object currentLayerData=currentMap.get(mappedKeyArray[i]);
				
				if(currentLayerData instanceof BasicDBList){
					BasicDBList list=(BasicDBList) currentLayerData;
					String result="";
					for(Object object: list){
						Object curValue=appendValue(mappedKeyArray,i+1,(DBObject) object);
							result+=curValue.toString()+(curValue.toString().endsWith(";")?"":";");	
					}
					return result;
				}else {
					currentMap=(DBObject) currentMap.get(mappedKeyArray[i]);
				}
				
			}else{
				return currentMap.get(mappedKeyArray[i]).toString();
			}
		}
		return null;
	}
	
	//Get the values of an DB Object by the key(a.b.c)
	public static Object getNodeValues(String mappingKey,BasicDBObject object){
		try{
		if(!StringUtils.isEmpty(mappingKey)){
			String[] layeredKeys=mappingKey.trim().split("\\.");
			String value=appendValue(layeredKeys,0,object);
			if(value.endsWith(";"))
				value=value.substring(0,value.length()-1);
			return value;
		}
		}catch(Exception e){
			return null;
		}
		
		return null;
	}
	
	//Change the Map format from (Key,Value) -> (Value, List<Key>)
	public static Map<String, List<String>> reverseMappingElem(Map<String, String> origMap){
		if(origMap==null||origMap.size()==0)
			return null;
		
		Map<String, List<String>> reversedMap=new HashMap<String, List<String>>();
		for(String key:origMap.keySet()){
			String curValue=origMap.get(key);
			if(reversedMap.containsKey(curValue)){
				reversedMap.get(curValue).add(key);
			}else{
				List<String> values=new ArrayList<String>();
				values.add(key);
				reversedMap.put(curValue, values);
			}
		}
		return reversedMap;
	}
	
	public static List<String> getMergedListByMap(List origList, Map<String, String> compareMap){
		if(compareMap==null||compareMap.size()==0)
			return origList;
		
		Set<String> dataSet=new LinkedHashSet<String>();
		for(int i=0;i<origList.size();i++){
			String value=origList.get(i).toString().replace(".0", "");
			if(compareMap.containsKey(value)){
				dataSet.add(compareMap.get(value));
			}else {
				dataSet.add(value);
			}
		}
/*		for(String value:origList){
			if(compareMap.containsKey(value)){
				dataSet.add(compareMap.get(value));
			}else {
				dataSet.add(value);
			}
		}*/
		return new ArrayList<String>(dataSet);
		
	}
	
}
