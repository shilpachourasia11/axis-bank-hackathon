#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import errno

class Helper(object):

    @classmethod
    def create_parent_folders_for_folder(cls, path):
        """
        Given folder path, create parent folders, if not exists
        :param path:
        :return:
        """
        try:
            os.makedirs(path)
        except OSError as exc:  # Python >2.5
            if exc.errno == errno.EEXIST and os.path.isdir(path):
                pass
            else:
                raise

    @classmethod
    def create_parent_folders_for_file(cls, file_name):
        """
        Given a file name, check if folder path exists. If not create parent folders
        :param file_name:
        """
        if not os.path.exists(os.path.dirname(file_name)):
            try:
                os.makedirs(os.path.dirname(file_name))
            except OSError as exc:  # Guard against race condition
                if exc.errno != errno.EEXIST:
                    raise
