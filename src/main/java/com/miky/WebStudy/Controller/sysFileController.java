package com.miky.WebStudy.Controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.miky.WebStudy.Entity.sysFile;
import com.miky.WebStudy.Entity.sysFileKey;
import com.miky.WebStudy.Service.sysFileService;

@Controller
public class sysFileController {

	@Resource
	sysFileService service;

	@RequestMapping(value = "getSpinner", method = RequestMethod.POST)
	@ResponseBody
	public sysFile getSpinner(@RequestBody sysFileKey sysFileKey) {
		return service.getSysFile(sysFileKey);
	}

}
